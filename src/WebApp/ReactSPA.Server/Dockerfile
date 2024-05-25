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
