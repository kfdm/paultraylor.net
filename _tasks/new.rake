class String
  def to_url
    self.gsub(' ','-').downcase
  end
end


# Taken from http://cartera.me/2010/08/12/about-this-website/


directory "_posts"

desc 'Start a new blog post'
task :new => ["_posts"] do
    title = ask("Title: ")
    fileName = ask("Filename: default(#{title.to_url})").strip! || title.to_url
    path = "_posts/#{Time.now.strftime("%Y-%m-%d")}#{'-' + fileName}.md"
    unless File.exist?(path)
        File.open(path, "w") do |post|
            post.puts "---"
            post.puts "layout: post"
            post.puts "title: #{title}"
            post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
            post.puts "categories: "
            post.puts "---"
            sh "mate",path
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
