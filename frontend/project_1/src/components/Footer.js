import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#4a4a4a",
    borderRadius: "16px 16px 0 0",
    boxShadow: "0 -4px 10px 0 rgba(0, 0, 0, 0.2)",
    padding: "32px",
  },
  gridContainer: {
    justifyContent: "space-around",
  },
  sectionTitle: {
    marginBottom: "16px",
    marginLeft: "40px",
    fontWeight: "bold",
  },
  sectionContent: {
    marginBottom: "16px",
    marginLeft: "40px",
  },
  link: {
    color: "#fff",
    "&:hover": {
      color: "#808080",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className={classes.sectionTitle}>
            О Нас
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
          ООО «МБайсикл» основано в октябре 2016 года в г. Гомеле. Фокус компании – заказная разработка ПО, создание MVPдля стартапов, высоконагруженные web-проекты, APIи разработка мобильных приложений для таких сфер как навигация, сельское хозяйство, спорт и других. Ключевые технологии - iOS, Android, Java, PHP и др.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Контактная информация
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
           г. Минск, ул. Интернациональная, 25А
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            г. Гомель,  ул. Пушкина 10А
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
          +375 (29) 338-27-73
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            mbicycle.admin@mbicycle.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Следи за нами
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            <a href="https://www.linkedin.com/company/mbicycle/" className={classes.link}>Linkedin</a>
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            <a href="https://twitter.com/mbicycle_com" className={classes.link}>Twitter</a>
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            <a href="https://www.facebook.com/MBicycleCo/" className={classes.link}>Facebook</a>
          </Typography>
          <Typography variant="body1" className={classes.sectionContent}>
            <a href="https://www.instagram.com/mbicycle_team/" className={classes.link}>Instagram</a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;