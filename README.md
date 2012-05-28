# Tranlink Proxy

Basically, run this node app on nodejitsu or similar to make proxied cross-domain requests to the trasnlink realtime bus info api. Currently only route lookups are supported:

* nb.translink.ca/rideapi.ashx?cp=gsr%2F0991

## Usage

Make requests to the proxy:

* http://127.0.0.1:8001/?route=20&callback=CallBackName

