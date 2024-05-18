import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

const JavaPage = (user) => {
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const adgeJava = [
        {
          title: "Объектно-ориентированный",
          text: "Java полностью поддерживает объектно-ориентированное программирование (ООП), что подразумевает, что разработчики не только определяют тип данных и их структуру, но и набор применяемых к ним функций. Помимо ООП, Java также совместима с лямбда-выражениями и анонимными функциями. Команда Mbicycle использует ООП, чтобы облегчить разработку и сделать программное обеспечение гибким и расширяемым.",
        },
        {
          title: "Безопасность",
          text: "Java безопасен, поскольку не использует указатели, хранящие адрес памяти значения, и, таким образом, может допускать несанкционированный доступ к памяти. Еще одним аспектом безопасности высокого уровня является Java Security Manager, который определяет правила доступа для приложений. Наши разработчики всегда используют Java Security Manager и предварительно запускаемые приложения в «песочнице», чтобы обеспечить их безопасность и избежать рисков.",
        },
        {
          title: "Независимость от платформы",
          text: "Разработка приложений на Java основана на принципе «Напиши один раз, работай где угодно» (WORA). WORA позволяет разработчикам создавать программное обеспечение Java для конкретной операционной системы, затем компилировать его в байт-код и запускать на любой другой платформе, где установлена ​​виртуальная машина Java. Мы используем принцип WORA, чтобы ускорить написание Java-приложений и сэкономить время для других задач и улучшений.",
        },
        {
          title: "Экономическая эффективность",
          text: "Использование Java с самого начала бесплатно, поэтому не требуется никаких платежей со стороны компании или независимых разработчиков для создания приложений Java. Эта политика бесплатного использования также способствует росту сообщества Java и широкому распространению Java среди предприятий. Благодаря этому специалисты Mbicycle могут предложить справедливую цену за наши услуги по разработке приложений Java.",
        },
  ];

  const toolsJava = [
    {
      title: "Рамки I",
      text: "Spring Framework (загрузка/облако/данные/MVC/безопасность/интеграция)",
    },
    {
      title: "Фреймворки II",
      text: "Пролетный путь Ликвибаза Спящий режими БАТИС Юнит ДСП JSF",
    },
    {
      title: "Рамки III",
      text: "Мокито Ломбок Сваггер Джаспер Репортс",
    },
    {
      title: "Рамки IV",
      text: "Netflix OSS (Лента/Эврика/Хистрикс/Зуул)",
    },
    {
      title: "Рамки I",
      text: "Spring Framework (загрузка/облако/данные/MVC/безопасность/интеграция)",
    },
    {
      title: "Фреймворки II",
      text: "Пролетный путь Ликвибаза Спящий режими БАТИС Юнит ДСП JSF",
    },
    {
      title: "Рамки III",
      text: "Мокито Ломбок Сваггер Джаспер Репортс",
    },
    {
      title: "Рамки IV",
      text: "Netflix OSS (Лента/Эврика/Хистрикс/Зуул)",
    },
    {
      title: "Рамки I",
      text: "Spring Framework (загрузка/облако/данные/MVC/безопасность/интеграция)",
    },
    {
      title: "Фреймворки II",
      text: "Пролетный путь Ликвибаза Спящий режими БАТИС Юнит ДСП JSF",
    },
    {
      title: "Рамки III",
      text: "Мокито Ломбок Сваггер Джаспер Репортс",
    },
    {
      title: "Рамки IV",
      text: "Netflix OSS (Лента/Эврика/Хистрикс/Зуул)",
    },
  ];

  const openJavaUser = () => {
    navigate("/java-users");
  };

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="xl" style={{padding: "20px" }}>
            <h1 style={{color: "black", marginBottom: "5px", marginTop: "40px" }}>Разработка Java-приложений</h1>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>Mbicycle имеет обширный опыт поставки надежных Java-приложений в срок и в рамках бюджета. На сегодняшний день мы помогли спортивным и студенческим клубам, инженерным и страховым компаниям, предприятиям нефтедобывающей отрасли и другим клиентам запустить их программное обеспечение на базе Java.</p>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>Имея многолетний опыт разработки мобильного и веб-программного обеспечения, Mbicycle предлагает ряд услуг по разработке программного обеспечения на Java.</p>
        </Container>
        <div style={{ padding: matchesMobile ? "5px" : "20px", textAlign: "center", backgroundSize: "cover" }}>
        <Container maxWidth="xl">
        <h1 style={{color: "black", marginBottom: "5px", textAlign: "left"}}>Ключевые преимущества разработки на Java</h1>
        <p style={{color: "black", marginBottom: matchesMobile ? "5px" : "20px", textAlign: "left", fontSize: "22px"}}>Если вы все еще ищете наиболее подходящую платформу для оцифровки своих услуг или операций, вот наш взгляд на ключевые преимущества Java как платформы для разработки приложений.</p>
          <Grid container spacing={3}>
            {adgeJava.map((adge, index) => (
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
                    <h2 variant="h5">{adge.title}</h2>
                    <p variant="body1" paragraph style={{ fontSize: "16px" }}>
                      {adge.text}
                    </p>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Container maxWidth="xl" style={{padding: "20px" }}>
            <h1 style={{color: "black", marginBottom: "5px", marginTop: "20px" }}>Доступные консультанты по Java 24/7</h1>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>В Mbicycle имеется полноценный отдел квалифицированных консультантов, помогающих нашим клиентам подготовиться к реализации проектов по разработке приложений.</p>
            <p style={{color: "black", marginBottom: "5px", fontSize: "22px"}}>От идеи проекта до его реализации и технической поддержки наши консультанты остаются на связи с клиентом на каждом этапе всего цикла разработки, чтобы минимизировать количество возможных препятствий при внедрении своего программного обеспечения.</p>
      </Container>
      <div style={{ padding: "20px", textAlign: "center", backgroundSize: "cover" }}>
        <Container maxWidth="xl">
        <h1 style={{color: "black", marginBottom: "20px", textAlign: "left"}}>Наш набор инструментов Java</h1>
          <Grid container spacing={0.3}>
            {toolsJava.map((tool, index) => (
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

export default JavaPage;