



#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/WebApp/ReactSPA.Server/ReactSPA.Server.csproj", "src/WebApp/ReactSPA.Server/"]
COPY ["reactspa.client/reactspa.client.esproj", "reactspa.client/"]
RUN dotnet restore "./src/WebApp/ReactSPA.Server/ReactSPA.Server.csproj"
COPY . .
WORKDIR "/src/src/WebApp/ReactSPA.Server"
RUN dotnet build "./ReactSPA.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ReactSPA.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ReactSPA.Server.dll"]



































##See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
#
#FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
##USER app
#WORKDIR /app
##EXPOSE 8080
##EXPOSE 8081
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
##RUN apt-get update
##RUN apt-get install curl
##RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
##RUN apt-get -y install nodejs
#RUN apt-get update
#RUN apt-get install -y curl
#RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
#RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
#RUN apt-get install -y nodejs
#
#
#FROM with-node AS build
#ARG BUILD_CONFIGURATION=Release
#WORKDIR /src
#COPY ["src/WebApp/ReactSPA.Server/ReactSPA.Server.csproj", "/WebApp/ReactSPA.Server/"]
#COPY ["src/WebApp/reactspa.client/reactspa.client.esproj", "/WebApp/reactspa.client/"]
#RUN dotnet restore "./src/WebApp/ReactSPA.Server/ReactSPA.Server.csproj"
#COPY . .
#WORKDIR "/src/WebApp/ReactSPA.Server"
#RUN dotnet build "./ReactSPA.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build
#
#FROM build AS publish
#ARG BUILD_CONFIGURATION=Release
#RUN dotnet publish "./ReactSPA.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
#
#FROM node:20 AS build-web
#COPY ./src/WebApp/reactspa.client/package.json /WebApp/reactspa.client/package.json
#COPY ./src/WebApp/reactspa.client/package-lock.json /WebApp/reactspa.client/package-lock.json
#WORKDIR /src/WebApp/reactspa.client
#RUN npm ci
#COPY ./src/WebApp/reactspa.client/ /WebApp/reactspa.client
#RUN npm run build
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "ReactSPA.Server.dll"]
#