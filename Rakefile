# Taken from http://cartera.me/2010/08/12/about-this-website/

task :default => :server

desc 'Build site with Jekyll.'
task :build do
    jekyll
end

desc 'Start server with --auto.'
task :server do
    jekyll('--server --auto')
end

desc 'Remove all built files.'
task :clean do
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  Rake::Task['clean'].execute
  sh 'jekyll ' + opts
end

# From http://www.madcowley.com/madcode/2010/12/running-migrations-in-sinatra/
Dir.glob("#{File.dirname(__FILE__)}/_tasks/*.rake").each { |r| import r }
