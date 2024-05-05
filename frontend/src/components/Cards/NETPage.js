import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

const NETPage = () => {
    const constalting = [
        {
          title: "Миграция на .NET",
          text: "У нас есть все необходимое для плавного перехода ваших существующих приложений и цифровых сервисов на веб-платформу .NET, одновременно повышая их производительность. При переходе в .NET-экосистему мы превратим ваше приложение в кроссплатформенное, кроссбраузерное, высокопроизводительное и облачно-совместимое, используя при необходимости платформу ASP.NET Core, JavaScript и HTML5.",
        },
        {
          title: "Миграция в облако",
          text: "Мы получили практический опыт запуска, обработки, развертывания и масштабирования в облаке самых передовых приложений на базе ASP.NET, ASP.NET MVC, .NET Core и ASP.NET Core MVC. Мы предпочитаем Azure и Amazon AWS как наиболее эффективные и надежные платформы для запуска приложений наших клиентов в облаке. Мы также работаем с контейнерами Docker, чтобы обеспечить эффективное развертывание.",
        },
        {
          title: "Мобильная разработка с помощью Xamarin",
          text: "Мы обеспечиваем кроссплатформенную разработку мобильных приложений на базе .NET с использованием платформы Xamarin для создания приложений, совместимых как с iOS, так и с Android. Этот способ доставки мобильных приложений позволяет реализовать набор полезных .NET-функций, таких как LINQ, Lambdas и асинхронное программирование. С помощью Xamarin наши специалисты по разработке могут расширить ваше программное решение за счет встроенных возможностей платформы, таких как поддержка нескольких окон на Android и ARKit на iOS.",
        },
        {
          title: "API-сервисы",
          text: "Мы можем расширить функциональность вашего приложения на основе .NET, интегрировав его со сторонними сервисами через API, такими как мобильные серверные части, серверные решения для одностраничных приложений (SPA) и т. д. Такое взаимодействие обеспечивает быструю, безопасную и масштабируемую работу вашего приложения. а также оставляет место для будущей интеграции со сторонним программным обеспечением, таким как настольные и веб-приложения. Мы также подключаем мобильные службы Azure, чтобы оснастить ваше приложение дополнительным облачным хранилищем, встроенной аутентификацией и поддержкой push-уведомлений.",
        },
      ];

  const tools = [
    {
      title: "Primary Techs",
      text: "Core: C#, NET, NET Core, Docker containers",
    },
    {
      title: "Primary Techs",
      text: "Web: ASP.NET, ASP.NET MVC, ASP.NET Web API, SignalR, WebSockets, ASP.NET Core, Blazor",
    },
    {
      title: "Primary Techs",
      text: "Desktop: WPF, Universal Windows Platform (UWP) apps",
    },
    {
      title: "Primary Techs",
      text: "UI: AngularJS, Angular, React, Knockout JS, Vue JS",
    },
    {
      title: "Cross-Platform",
      text: "Xamarin, Xamarin.Forms",
    },
    {
      title: "RPC",
      text: "WCF, gRPC",
    },
    {
      title: "AMQP",
      text: "RabbitMQ, MassTransit, Message Bus (Azure)",
    },
    {
      title: "IoC",
      text: "StructureMap, Ninject, Castle Windsor, Autofac, Unity, Simple Injector, .NET Core",
    },
    {
      title: "Data Management",
      text: "RDBMS: MSSQL, PostgreSQL, Oracle, MySQL, SQLite, SQL/Stored Procedures",
    },
    {
      title: "Data Management",
      text: "NoSQL: MongoDB, Redis",
    },
    {
      title: "ORM & Mapping",
      text: "NHibernate, Entity Framework, EF Core, Dapper, AutoMapper",
    },
    {
      title: "Cloud Computing Platforms",
      text: "Amazon Web Services (AWS), Microsoft Azure, Third-Party APIs",
    },
  ];

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const openJavaUser = () => {
    navigate("/net-users");
  };

  return (
    <ThemeProvider theme={theme}>
        <div style={{ padding: "20px", textAlign: "center", backgroundSize: "cover", marginTop: "40px" }}>
        <Container maxWidth="xl">
        <h1 style={{color: "black", marginBottom: "5px", textAlign: "left"}}>Универсальный консалтинг по .NET</h1>
        <p style={{color: "black", marginBottom: "20px", textAlign: "left", fontSize: "22px"}}>Эксперты .NET из Mbicycle следят за последними тенденциями в области инструментов и технологий разработки Microsoft. Мы по-прежнему сосредоточены на поставке специализированных .NET-приложений для различных отраслей бизнеса. Когда дело доходит до создания многокомпонентных веб-приложений, облачных решений на базе Azure, кроссплатформенных приложений, созданных с помощью Xamarin, и многого другого, наша компания по разработке ASP.NET предлагает широкий спектр надежных услуг по разработке программного обеспечения для плавной и эффективной реализации ваших требования проекта.</p>
          <Grid container spacing={3}>
            {constalting.map((constalting, index) => (
              <Grid item sm={matchesDesktop ? 6 : 3} key={index}>
                <Paper
                  sx={{
                    margin: "0px",
                    color: "black",
                    textAlign: "center",
                    background: "rgb(255, 255, 255, 0.800)",
                    height: "100%",
                    borderCollapse: "collapse",
                    borderBottom: "2px solid #000",
                    "&:hover": {
                        height: matchesMobile ? "100%" : "103%",
                    } 
                  }}
                >
                  <div style={{ padding: "15px 15px 15px 15px"}}>
                    <h2 variant="h5">{constalting.title}</h2>
                    <p variant="body1" paragraph style={{ fontSize: "16px" }}>
                      {constalting.text}
                    </p>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Container maxWidth="xl" style={{padding: "20px" }}>
            <h1 style={{color: "black", marginBottom: "5px" }}>Технические эксперты по .NET</h1>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>Разработчики сертифицированных Microsoft решений из Mbicycle предоставили ряд высококлассных программных решений на основе .NET, ASP.NET, ASP.NET MVC, .NET Core, ASP.NET MVC Core и других связанных платформ.</p>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>Наша команда готова начать ваш следующий проект с помощью наших услуг по разработке Microsoft.</p>
        </Container>
      <div style={{ padding: "20px", textAlign: "center", backgroundSize: "cover" }}>
        <Container maxWidth="xl">
        <h1 style={{color: "black", marginBottom: "20px", textAlign: "left"}}>Наш набор инструментов .NET</h1>
          <Grid container spacing={0.3}>
            {tools.map((tool, index) => (
              <Grid item sm={matchesDesktop ? 6 : 3} key={index}>
                <Paper
                  sx={{
                    margin: "0px",
                    color: "black",
                    textAlign: "center",
                    background: "rgb(255, 255, 255, 0.800)",
                    height: "100%",
                    borderCollapse: "collapse",
                    borderBottom: "2px solid #000",
                    "&:hover": {
                        height: matchesMobile ? "100%" : "103%",
                    } 
                  }}
                >
                  <div style={{ padding: "15px 15px 15px 15px"}}>
                    <h2 variant="h5">{tool.title}</h2>
                    <p variant="body1" paragraph style={{ fontSize: "16px" }}>
                      {tool.text}
                    </p>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Button style={{margin: "30px 0", 
          fontSize: "18px", 
          color: "black", 
          backgroundColor: "#b4b4b4" }}
          onClick={openJavaUser}>Перейти к специалистам</Button>
      </div>
    </ThemeProvider>
  );
};

export default NETPage;