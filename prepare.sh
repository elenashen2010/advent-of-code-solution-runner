[ -d .git/info ] || mkdir -p .git/info;
[ -f .git/info/exclude ] && cp .git/info/exclude .git/info/exclude.backup;
cp .git-local-exclude .git/info/exclude;
