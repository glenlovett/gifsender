require 'sinatra'
require 'yaml'
require 'twilio-ruby'
require 'http'

config_template = ERB.new File.new(File.join(__dir__, 'config.yml.erb')).read
config = YAML.load config_template.result(binding)

get '/' do
  File.read "#{Dir.pwd}/public/index.html"
end

post '/sendmessage/:phonenumber/:message' do
  search_phrase = CGI.escape(params['message'])
  giphy_url = "http://api.giphy.com/v1/gifs/search?q=#{search_phrase}&limit=1&api_key=dc6zaTOxFJmzC"
  giphy_results = JSON.parse(HTTP.get(giphy_url).body)

  if (giphy_results != nil) && (giphy_results['data'].length > 0)
    #we found at least one gif
    gif_url = JSON.parse(HTTP.get(giphy_url).body)['data'][0]['images']['fixed_width_downsampled']['url']

    begin
      @twillio_client = Twilio::REST::Client.new config['twillio_account_sid'], config['twillio_auth_token']
      @twillio_client.account.messages.create(
        from: config['twillio_from_number'],
        to: "+1#{params['phonenumber']}",
        body: "Here's your gif of \"#{params['message']}\" from GifSend!",
        media_url: gif_url
      )
    rescue Twilio::REST::RequestError => e
      puts e.message
      status 500
    end
  else
    # status code for empty result
    status 204
  end
end
