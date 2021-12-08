# 月曜日と水曜日のみ実行
if [ `date +%u` -eq 1 -o `date +%u` -eq 3 ];then curl -X POST -H "Content-Type: application/json" -d '{"commonKey":"Hb7JjxpNVD6g50jxL1tRpbbs8ncggHvymwMguasik7Z4Y5n1QaL0vG0TEQPtuXwo"}' http://localhost:3000/api/user/discoverweekly/autoArchiveBatch;fi
