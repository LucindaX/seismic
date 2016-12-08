require "lib_checker/version"
require "bundler"
require "http"

module LibChecker
	class Connector
		
		def initialize
			@gems = nil
		end
		
		# Collect Gems required in the projects Gemfile
		def getGems
			@gems = Bundler.load.specs.map { |spec| spec.name }
		end
		
		# Fetch required systems libraries from server
		def getPackages
			# retrieve OS and arch info
			# lsb_release is a utility installed with all debian new versions
			# which contains system information
			lsb = `lsb_release -irc`
			machine_info = [] # [ Distribution ID , Release , Codename , Arch ]
			lsb.split("\n").map { |ele| machine_info << ele.split("\t")[1] }
			# add arch to machine_info
			machine_info << `arch`.chomp
			# fetch response from server
			response = HTTP.post("http://localhost:3000/api/packages", :json => { :gems => @gems, :machine_info => machine_info })
			return nil if response.code != 200
			packages = response.parse["packages"]
			return packages
		end

	end
end
