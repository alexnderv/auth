import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

const Mbicycle = () => {

  const rectanglesData = [
    {
      navigate: '/users',
      image: "url('https://img.freepik.com/premium-photo/wide-panorama-view-of-businessman-hand-signing-legal-or-insurance-document-or-business-contract-on-white-desk_254268-2676.jpg?w=1380')", // Замените на URL вашего изображения
      title: "2016 год",
      text: "Мы основали Mbicycle в 2016 году, чтобы помогать стартапам и предприятиям малого и среднего бизнеса воплощать в жизнь их амбициозные идеи.",
    },
    {
      navigate: '/projects',
      image: "url('https://img.freepik.com/free-photo/colleagues-giving-a-fist-bump_53876-64857.jpg?w=1380&t=st=1700047092~exp=1700047692~hmac=64b79b1315b3e5ac90f126d696857810854392d434e822ed14c10ddeb75c2a2e')", // Замените на URL вашего изображения
      title: "135+ реализованных проектов",
      text: "За прошедшие годы наша профессиональная компания по разработке программного обеспечения накопила навыки и опыт, предоставляя надежные услуги по индивидуальной разработке программного обеспечения.      ",
    },
    {
      webSite: 'https://iccdevelopment.com/#rec547185847',
      image: "url('https://img.freepik.com/premium-photo/successful-job-interview-boss-employer-in-suit-and-new-employee-shaking-hands-after-negotiation-and-interview-career-and-placement-concept_122498-355.jpg?w=1380')", // Замените на URL вашего изображения
      title: "Партнеры",
      text: "Mbicycle поддерживает тесное партнерство с дочерней компанией ICC Development . Их юридическое лицо в США дает нашим клиентам в США уверенность в соблюдении всех местных законных прав, соглашений и обязанностей посредством контракта с нашей стороны.",
    },
    {
      navigate: '/java-development',
      image: "url('https://img.freepik.com/free-photo/handsome-redhead-man-working-freelance-on-laptop-smiling-and-looking-pleased-at-computer-screen-whit_1258-170799.jpg?w=1380&t=st=1700048907~exp=1700049507~hmac=7944401cd965999ebdc5e0421934e658f873623243e80da7f0b2834dc4764010')", // Замените на URL вашего изображения
      title: "Java",
      text: "Эксперты Mbicycle имеют многолетний опыт предоставления эффективных программных решений Java в срок и в рамках бюджета. На сегодняшний день мы помогли спортивным и студенческим клубам, инженерным и страховым компаниям, предприятиям нефтедобывающей отрасли и другим клиентам запустить их программное обеспечение на базе Java.",
    },
    {
      navigate: '/net-development',
      image: "url('https://img.freepik.com/free-photo/impressed-young-man-holding-laptop-in-hands-staring-at-camera-with-excited-face-reading-online-promo_1258-147592.jpg?w=1380&t=st=1700048841~exp=1700049441~hmac=10fa2e7a2dc809af8e0950c09eecd857feaddf23ba7240c5b2cea44f7d3de07a')", // Замените на URL вашего изображения
      title: ".NET",
      text: "Разработчики сертифицированных Microsoft решений из Mbicycle предоставили ряд высококлассных программных решений на основе .NET, ASP.NET, ASP.NET MVC, .NET Core, ASP.NET MVC Core и других связанных платформ. Наша команда готова начать ваш следующий проект с помощью наших услуг по разработке Microsoft.",
    },
    {
      navigate: '/flutter-development',
      image: "url('https://img.freepik.com/free-photo/funny-redhead-man-in-glasses-showing-laptop-screen-advertisement-and-smiling-guy-with-red-hair-demon_1258-174392.jpg?w=1380&t=st=1700048433~exp=1700049033~hmac=0570139df04ddaf055913ba171fe9bc831b0d220555372ed1ea03c8026ea6d62')", // Замените на URL вашего изображения
      title: "Flutter",
      text: "Мы помогаем стартапам и компаниям любого размера создавать надежное нативное программное обеспечение на основе кроссплатформенной платформы Flutter. Тщательно следуя требованиям наших клиентов, мы всегда учитываем сроки и бюджет проекта.",
    },
  ];

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));


  const openWebsite = (url) => {
    window.open(url, "_blank");
  };

  const navigation = (url) => {
    navigate(url);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="mainImageMbicycle"
      style={{
        backgroundSize: "cover",
        background:
          "url('https://img.freepik.com/free-photo/diverse-businesspeople-having-a-meeting_53876-103954.jpg?w=1380&t=st=1700042427~exp=1700043027~hmac=caaf1866ffe310c695e46d5e7f2fbf6c2797d90a127d55945cec6e7e32529c96') 0 0/cover no-repeat",
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item sx={12} sm={5}>
            <div className="mainTextMbicycle"
              elevation={3}>
              <Typography variant="h4" gutterBottom className="mainText">
                Специалисты Mbicycle
              </Typography>
              <Typography variant="body1" className="secondaryText">
                Энтузиасты аутсорсинга разработки программного обеспечения,
                усердно работающие над созданием мощных программных решений.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {rectanglesData.map((rectangle, index) => (
            <Grid item xs={12} sm={matchesDesktop ? 6 : 4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  textAlign: "left",
                  background: "rgba(255, 255, 255, 0.800)",
                  height: "100%",
                  cursor: "pointer",
                  "&:hover": {
                    width: matchesMobile ? "100%" : "102%",
                    height: matchesMobile ? "100%" : "102%",
                  },
                }}
                onClick={() => {
                  navigation(rectangle.navigate);
                  if (rectangle.webSite) {
                    openWebsite(rectangle.webSite);
                  }
                }}
              >
                <div
                  style={{
                    backgroundImage: rectangle.image,
                    backgroundSize: "cover",
                    height: matchesMobile ? "200px" : "150px",
                    marginBottom: "15px",
                  }}
                />
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Typography variant="h5">{rectangle.title}</Typography>
                  <Typography variant="body1" paragraph style={{ fontSize: "18px" }}>
                    {rectangle.text}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  </ThemeProvider>
);
};

export default Mbicycle;