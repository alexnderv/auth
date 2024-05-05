import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

const FlutterPage = () => {
    const skills = [
        {
          title: "Экономика по требованию",
          text: "включая решения для доставки еды, торговых площадок, телемедицины, аренды автомобилей и других программных услуг.",
        },
        {
          title: "Виды спорта",
          text: "включая решения для управления спортивными командами, ставок, отслеживания данных о состоянии здоровья и производительности в режиме реального времени, программное обеспечение для фитнеса и хорошего самочувствия.",
        },
        {
          title: "Электронное обучение",
          text: "включая приложения для онлайн-обучения, решения для второго экрана и витрины, платформы электронного обучения, образовательные клубы и центры.",
        },
      ];

  const tools = [
    {
      title: "Primary Techs",
      text: "Core: Dart",
    },
    {
      title: "Primary Techs",
      text: "UI: Flutter, Material design, Cupertino Design",
    },
    {
      title: "Common Libraries and Tools",
      text: "Android Studio, Xcode, Flutter Performance, Flutter Inspector, Flutter Outline",
    },
    {
      title: "Architecture",
      text: "Clean Architecture, MVI, MVC, MVVM",
    },
    {
      title: "Dependency Injection",
      text: "get_it, kiwi, dependencies_flutter, InheritedWidget ",
    },
    {
      title: "Testing",
      text: "Unit tests, Widget tests, Integration tests, flutter_test, flutter_driver, flutter_gallery",
    },
    {
      title: "Data Management",
      text: "Redux, MobX, BLoC/Rx, Provider, Riverpod, GetX, setState",
    },
    {
      title: "Cloud Services",
      text: "Firebase services, Amplify Flutter",
    },
  ];

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const openJavaUser = () => {
    navigate("/flutter-users");
  };

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="xl" style={{padding: matchesMobile ? "5px" : "20px"  }}>
            <h1 style={{
              color: "black", 
              marginBottom: matchesMobile ? "1px" : "5px", 
              marginTop: matchesMobile ? "10px" : "50px" }}>Услуги по разработке приложений Flutter от Mbicycle</h1>
            <p style={{
              color: "black", 
              marginBottom: matchesMobile ? "1px" : "5px", 
              fontSize: matchesMobile ? "14px" : "22px"}}>Мы помогаем стартапам и компаниям любого размера создавать надежное нативное программное обеспечение на основе кроссплатформенной платформы Flutter. Тщательно следуя требованиям наших клиентов, мы всегда учитываем сроки и бюджет проекта, чтобы предложить следующие услуги по разработке:</p>
            <p style={{
              color: "black", 
              marginBottom: matchesMobile ? "1px" : "5px", 
              fontSize: matchesMobile ? "14px" : "22px"}}>Разработка мобильного приложения Flutter для iOS и Android
            Услуги веб-разработки Flutter
            Миграция веб-приложений на Flutter
            Оптимизация приложений на основе Flutter
            Обслуживание и поддержка приложений Flutter
            Управление командами разработчиков Flutter</p>
        </Container>
        <div style={{ 
          padding: matchesMobile ? "5px" : "20px", 
          textAlign: "center", 
          backgroundSize: "cover" }}>
        <Container maxWidth="xl">
        <h1 style={{
          color: "black", 
          marginBottom: matchesMobile ? "1px" : "5px", 
          textAlign: "left"}}>
            Мобильные решения Flutter для разных доменов</h1>
        <p style={{color: "black", 
        marginBottom: matchesMobile ? "5px" : "20px", 
        textAlign: "left", 
        fontSize: matchesMobile ? "14px" : "22px"}}>
          Мы обладаем соответствующими навыками и техническим опытом для предоставления услуг по разработке кроссплатформенных приложений на основе Flutter в следующих областях:</p>
          <Grid container spacing={3}>
            {skills.map((skills, index) => (
              <Grid item sm={matchesDesktop ? 6 : 4} key={index}>
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
                      width: matchesMobile ? "100%" : "103%",
                      height: matchesMobile ? "100%" : "103%",
                    } 
                  }}
                >
                  <div style={{ padding: "15px 15px 15px 15px"}}>
                    <h2 variant="h5">{skills.title}</h2>
                    <p variant="body1" paragraph style={{ fontSize: "16px" }}>
                      {skills.text}
                    </p>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
        </div>
      
      <div style={{ padding: "20px", textAlign: "center", backgroundSize: "cover" }}>
        <Container maxWidth="xl">
        <h1 style={{color: "black", marginBottom: "20px", textAlign: "left"}}>Часто используемый технологический стек Flutter</h1>
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
                      width: matchesMobile ? "100%" : "103%",
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

export default FlutterPage;