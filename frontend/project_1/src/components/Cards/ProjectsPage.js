import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Grid, Container } from "@mui/material";

const theme = createTheme();

const projectsJava = [
  {
    title: "EnCata: программное обеспечение для автоматизации бизнес-процессов",
    description1: "Перед нашей командой стояла задача разработать сервис, позволяющий нашему клиенту EnCata организовать внутреннее управление сотрудниками, бизнес-процессами и корпоративными ресурсами.",
    description2: "В ходе совместной работы наших компаний специалисты Mbicycle успешно реализовали весь необходимый функционал услуг по автоматизации бизнес-процессов на стороне клиента. Сегодня руководство EnCata активно использует наше программное обеспечение в своей повседневной деятельности.",
    image: "https://img.freepik.com/free-photo/close-up-man-writing-code-on-the-laptop_158595-5169.jpg?w=1380&t=st=1700429587~exp=1700430187~hmac=83081ea9e15b84c68bb759582af2d521bbcc5df8732a50ff5bffb7ad1d3e3008",
  },
  {
    title: "FreeFlight Drones: приложение для управления дронами",
    description1: "Французский производитель дронов и беспроводных устройств Parrot обратился к нам с просьбой разработать приложение с набором функций для просмотра и редактирования медиаконтента, снятого с помощью их собственных дронов.",
    description2: "Мы создали мобильное решение, которое в дальнейшем будет подключено к основному приложению клиента, позволяя пользователям обрабатывать, просматривать и редактировать медиа контент, снятый с помощью фирменных дронов Parrot.",
    image: "https://img.freepik.com/free-photo/close-up-a-man-controls-a-drone-in-the-dawn-sun-on-the-volcano-batur-bali-indonesia_72229-955.jpg?w=1380&t=st=1700430274~exp=1700430874~hmac=62b63102c55f69a95640c278c9c45766680dd03fd540f0dcc09ca24c8a9b9cc2",
  },
  {
    title: "DIE Wizard: решение Digital Signage для Android",
    description1: "В данном случае нашей задачей было разработать приложение для цифровых вывесок, предполагающее использование светодиодной и ЖК-проекции, и интегрировать его в текущий программно-аппаратный комплекс клиента.",
    description2: "В процессе разработки наши специалисты успешно создали Android приложение с набором необходимых функций, а также доработали и улучшили функциональность других предустановленных Android-приложений, доступных на консоли клиента.",
    image: "https://img.freepik.com/free-photo/exit-sign_1361-144.jpg?w=1380&t=st=1700430473~exp=1700431073~hmac=07ee2b4ef3ca6db6cabc34dd5f12eeec237a5c3ae61bfa7d40c4966d577801ce",
  },
];

const projectsNet = [
    {
      title: "Управление нефтью и газом: программный инструмент для мониторинга нефтяных платформ",
      description1: "Клиенту требовалось программное обеспечение для проверки текущего состояния каждой нефтяной платформы, расположенной на подконтрольных ему территориях.",
      description2: "Чтобы удовлетворить потребности этого проекта, наши эксперты разработали веб-портал, предоставляющий своевременную обновленную информацию о таких значимых параметрах, как местоположение платформы, глубина воды, высота палубы, производственные данные и другую информацию, необходимую менеджерам платформ для мониторинга их текущего состояния, надежности и статусы безопасности.",
      image: "https://img.freepik.com/free-photo/oil-platform-in-the-ocean-with-the-sun-setting-behind-it_123827-23498.jpg?w=1380&t=st=1700431470~exp=1700432070~hmac=0cece57021edabb394dcc928a20e49c7a1a1291f11b52241880e81b4f0edff99",
    },
];

const projectsFlutter = [
    {
      title: "Решение для управления молодежной спортивной командой",
      description1: "Возможно:",
      description2: "управлять и корректировать составы команд, отправлять мгновенные сообщения всей команде или конкретному спортсмену прямо на ходу, совершать безопасные и быстрые платежи для различных целей прямо в приложении, планировать игры, тренировки и другие мероприятия, устанавливать гибкие напоминания и push-уведомления, добавлять и делиться медиафайлами, относящимися к конкретной игре или событию.",
      image: "https://img.freepik.com/free-photo/happy-young-friends-in-a-bowling-club_23-2148344527.jpg?w=996&t=st=1700431956~exp=1700432556~hmac=e39db7367d74f55d8acc3eab2f3b01a63d0740b8387b9a8626ccbf842b259290",
    },
    {
      title: "Платформа электронного обучения для дистанционного обучения",
      description1: "Приложение предлагает две роли пользователя: учителя и ученики.",
      description2: "Преподаватели могут создавать чаты для разных групп учащихся, объединенных по различным параметрам. Учителя могут назначать домашние задания конкретным учащимся, прикреплять к ним файлы и позже просматривать их прогресс. Учителя используют встроенный календарь, чтобы проверять домашние задания, устанавливать сроки и отмечать выполненные задачи. У учащихся есть вкладка со своими личными домашними заданиями, куда они могут сдать их по мере готовности и прикрепить файлы различных форматов.",
      image: "https://img.freepik.com/free-photo/virtual-classroom-and-study-space_23-2149178714.jpg?w=1380&t=st=1700432357~exp=1700432957~hmac=82eeade517c7292654933ad8aabb34cce67ec51ed3b6edc1efae501b13ed7588",
    },
    {
      title: "Торговая площадка для поиска экспертов по домашнему переезду",
      description1: "Возможности:",
      description2: "Создайте и составьте свой личный план переезда и упаковочный лист. Сравните транспортные компании по ценам и отзывам Свяжитесь с конкретным поставщиком переездов напрямую или через службу поддержки. Добавьте и обновите информацию о своей страховке Возможность рассчитать и оплатить стоимость «за единицу товара» за каждый переезд. Просматривайте и обновляйте детали плана переезда в режиме реального времени.",
      image: "https://img.freepik.com/free-photo/clean-new-house-full-of-boxes_23-2149275860.jpg?w=1380&t=st=1700432390~exp=1700432990~hmac=4b9c1473dd0230190f0f92661fe82501641c82032af3aee4b4b4486346754652",
    },
];

const ProjectsPage = () => {
  const Item = ({ item }) => (
     <Paper style={{ padding: "20px", marginTop: "40px",  background: "rgb(255, 255, 255, 0.800)" }}>
      <Grid container spacing={4}>
       <Grid item xs={12} sm={6}>
         <img src={item.image} alt={item.title} style={{ maxWidth: "100%", borderRadius: "1%" }} />
        </Grid>
        <Grid item xs={12} sm={6} style={{}}>
         <h1>{item.title}</h1>
         <p style={{fontSize: "22px", padding: "15px 0px" }}>{item.description1}</p>
         <p style={{fontSize: "22px" }}>{item.description2}</p>
        </Grid>
      </Grid>
     </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="xl" >
            <h1 style={{color: "black", marginTop: "25px", marginButton: "20px",}}>Несколько решений, успешно разработанных нашей командой Java-разработчиков:</h1>
            <Carousel>
                {projectsJava.map((projectJava, index) => (
                <Item key={index} item={projectJava} />
                ))}
            </Carousel>
        </Container>
        <Container maxWidth="xl">
            <h1 style={{color: "black", marginTop: "25px"}}>Решение, успешно разработанное Mbicycle с использованием фреймворков и инструментов Microsoft:</h1>
            {projectsNet.map((projectNet, index) => (
            <Item key={index} item={projectNet} />
            ))}
        </Container>
        <div style={{marginBottom: "40px"}}>
          <Container maxWidth="xl" style={{ marginButton: "20px",}}>
            <h1 style={{color: "black", marginTop: "25px"}}>Взгляните на несколько приложений на основе Flutter, разработанных экспертами Mbicycle:</h1>
            <Carousel maxWidth="xl">
                {projectsFlutter.map((projectFlutter, index) => (
                <Item key={index} item={projectFlutter} />
                ))}
            </Carousel>
        </Container>
        </div>
    </ThemeProvider>
  );
};

export default ProjectsPage;