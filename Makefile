THIRD_PARTY="./third_party"

build:
	# mkdir build
	# cat less/* third_party/bootstrap/less/bootstrap.less third_party/bootstrap/less/responsive.less > style.less
	# lessc --yui-compress --include-path=less:third_party/bootstrap/less style.less public/style.css
	# rm -f style.less
serve:
	cd public && python -m SimpleHTTPServer
