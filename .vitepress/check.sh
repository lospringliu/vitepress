#!/bin/bash

flag_sync=$1

echo checking package.json tsconfig.base.json
FNS="package.json tsconfig.base.json"
target=..
[ -d $target ] || ( echo target not found; exit )
for FN in $FNS; do
	if [ -n "$flag_sync" ]; then
		cp -v $FN $target/$FN
	else
		echo not copying $FN
	fi
done

target=..

echo "target=$target"
[ -d $target ] || ( echo target not found; exit )


echo checking source
for FN in `find src -type f`; do
	echo "found file $FN"
	if ! diff $FN $target/$FN 2>/dev/null; then
		if [ -n "$flag_sync" ]; then
			cp -v $FN $target/$FN
		else
			echo not copying $FN
		fi
	fi
done

