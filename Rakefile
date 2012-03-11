# Taken from http://cartera.me/2010/08/12/about-this-website/

task :default => :server

desc "Kill any running Jekyll instances"
task :kill do
    `psgrep -n bin/jekyll`.each do |line|
        pid = line.split(' ')[1]
        puts "Killing Jekyll with pid #{pid}"
        `kill #{pid}`
    end
end

desc 'Start server with --auto.'
task :server => [:kill] do
  sh 'screen -S jekyll jekyll --server --auto'
end

# From http://www.madcowley.com/madcode/2010/12/running-migrations-in-sinatra/
Dir.glob("#{File.dirname(__FILE__)}/_tasks/*.rake").each { |r| import r }
