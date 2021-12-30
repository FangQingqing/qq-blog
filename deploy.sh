set -e

npm run build

cd src/.vuepress/dist

git init
git add -A
git commit -m "deploy"

git push -f https://github.com/FangQingqing/qq-blog.git master:pub-blog

cd -