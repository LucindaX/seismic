# LibChecker

This Gem checks your projects' Gemfile for included gems and runs them against our DB to determine what system libraries need to be installed locally on your machine if any , to avoid excpetions and errors .

## Installation

Pull this gem locally to your machine . Make sure you have `Bundler` installed then enter the `lib_checker` directory and run the following to install the dependencies and the `lib_checker` gem locally .

```
$ bundle install

$ rake install
```
with these commands you've installed `lib_checker` . This also generates an executable with the same name `lib_checker` to use from command line to check your projects where you have your dependencies listed in the `Gemfile` .

This Gem has been developed for local use and has not been uploaded `rubygems.org`

Make sure to install the gem in the same gemset as you intend if you're using different gemsets for different projects .

If you wish to include this gem in your `Gemfile` pull the gem and add the following to your `Gemfile`

```ruby
gem "lib_check", :path => "path/to/gem/directory"
```
## Usage

To use just navigate to your ruby project directory where the `Gemfile` is present and run the executable :

```
$ lib_checker

```
It will read the projects' gems and contacts the server to return the list of system libraries that need to be installed if any . After that you can follow the prompt as it will ask you if you'd like to install these packages on you machine using `apt-get install` and you can choose to do so or not .

## Development

This Gem contains two main files `lib/lib_checker.rb` and an executable script `bin/lib_checker` .

`lib/lib_checker.rb` contains a class `Connector` which has two methods :

`getGems` : which uses `Bundler` api to read gems from `Gemfile` .
`getPackages` : which gets some OS information , along with the gems and sends them to our server to retrieve the packages needed if any .

`bin/lib_checker` : is a script that requires the above class and runs these functions to provide the user with a list of packages ( system libraries ) and prompts the user to install these using `apt-get install`

The code is simple , documented and easy to follow in both files .

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

