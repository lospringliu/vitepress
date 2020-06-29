#!/bin/bash

flag_sync=$1

target=../dist
[ -d ../node_modules/vpress/dist ] && target=../node_modules/vpress/dist

echo "target=$target"
[ -d $target ] || ( echo target not found; exit )


echo checking markdown
echo checking theme
echo checking components
for FN in `find node client -type f`; do
	if ! diff $FN $target/$FN 2>/dev/null; then
		if [ -n "$flag_sync" ]; then
			cp -v $FN $target/$FN
		else
			echo not copying $FN
		fi
	fi
done
