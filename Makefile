PROC_8000 = `lsof -t -i:8000`
PROC_9810 = `lsof -t -i:9810`


build: clean
	mkdir build
	cat less/* \
			third_party/bootstrap/less/bootstrap.less \
			third_party/bootstrap/less/responsive.less \
			> build/style.less
	lessc build/style.less public/style.css \
			--yui-compress \
			--include-path=less:third_party/bootstrap/less
	cp third_party/pathjs/path.min.js public/
	java -jar third_party/plovr/plovr-eba786b34df9.jar build config/plovr.json
	rm -rf build

clean:
	rm -rf build

kill:
	-kill -9 $(PROC_8000)
	-kill -9 $(PROC_9810)

serve: kill
	java -jar third_party/plovr/plovr-eba786b34df9.jar serve config/plovr.json &
	cd public && python -m SimpleHTTPServer 8000 &
