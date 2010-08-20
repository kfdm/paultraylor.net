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

directory "_posts"

desc 'Start a new blog post'
task :new => ["_posts"] do
    title = ask("Title: ")
    fileName = ask("Filename: ")
    article = {"title" => title, "layout" => "post"}.to_yaml
    article << "---"
	directory "_posts"
    path = "_posts/#{Time.now.strftime("%Y-%m-%d")}#{'-' + fileName}.md"
    unless File.exist?(path)
        File.open(path, "w") do |file| 
            file.write article
            sh "mate " + path
        end
        puts "A new article was created at #{path}."
    else
        puts "There was an error creating the article, #{path} already exists."
    end
end

def ask message
  print message
  STDIN.gets.chomp
end
