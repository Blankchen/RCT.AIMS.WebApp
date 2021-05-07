Doc: https://blank-chen.medium.com/rct-2020-10-project-asset-inventory-management-system-ec230e405111

### docker 
https://docs.microsoft.com/zh-tw/sql/linux/quickstart-install-connect-docker?view=sql-server-2017&pivots=cs1-bash

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Passw0rd12345" \
   -p 1433:1433 --name sql1 \
   -d mcr.microsoft.com/mssql/server:2017-latest

docker start sql1
```

Id=sa
Password=Passw0rd12345

### cmd
```
# sync db
dotnet ef database update
```

### run dotnet core
swagger: https://localhost:5001/swagger/index.html
```
dotnet run
```

## install jest test
https://dev.to/alfredoperez/angular-10-setting-up-jest-2m0l
https://github.com/thymikee/jest-preset-angular

