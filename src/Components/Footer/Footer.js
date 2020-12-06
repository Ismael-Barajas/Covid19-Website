import React from "react";
import styles from "./Footer.module.css";


class Footer extends React.Component {
    render() {
        return(
            <div className={styles.footer}>
                <h3>SOURCES</h3>
                <h4> References</h4>
                <ul>
                    <li>Author: DOMO </li> 
                    <a href = "https://www.domo.com/coronavirus-dashboard/embed" > https://www.domo.com/coronavirus-dashboard/embed</a>
                    <li>Author: Rikam Palkar </li> 
                    <a href = "https://www.c-sharpcorner.com/article/covid-19-tracker-website-with-react-material-ui-chart-js/" > https://www.c-sharpcorner.com/article/covid-19-tracker-website-with-react-material-ui-chart-js/</a>
                    <li>Author: BING </li> 
                    <a href = "https://www.bing.com/covid/local/unitedstates" > https://www.bing.com/covid/local/unitedstates</a>
                </ul>
                <h4> Graphs and Tables </h4>
                <ul>
                    <li>Author: Worldometer </li> 
                    <a href = "https://www.worldometers.info/coronavirus/" > https://www.worldometers.info/coronavirus/</a>
                </ul>
                <h4> API's </h4>
                <ul>
                    <li>Author: mathdro </li> 
                    <a href = "https://covid19.mathdro.id/api" > https://covid19.mathdro.id/api</a>
                    <li>Author: disease.sh </li> 
                    <a href = "https://corona.lmao.ninja/" > https://corona.lmao.ninja/</a>
                    <a href = "https://github.com/disease-sh/API" > https://github.com/disease-sh/API</a>
                </ul>
                <h4> Tutorials </h4>
                <ul>
                    <li>Author: Colby Fayock </li> 
                    <a href = "https://www.colbyfayock.com/2020/03/how-to-create-a-coronavirus-covid-19-dashboard-map-app-with-gatsby-and-leaflet" > https://www.colbyfayock.com/2020/03/how-to-create-a-coronavirus-covid-19-dashboard-map-app-with-gatsby-and-leaflet</a>
                    <li>Author: Sabesan Sathananthan </li> 
                    <a href = "https://towardsdatascience.com/lets-create-a-covid-19-tracker-using-react-js-5a3a0265a633" > https://towardsdatascience.com/lets-create-a-covid-19-tracker-using-react-js-5a3a0265a633</a>
                </ul>
            </div>
        );
    }
}

export default Footer;
