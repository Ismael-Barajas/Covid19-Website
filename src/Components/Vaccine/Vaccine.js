import { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { fetchVaccineData } from "../../api";

class Vaccine extends Component {
  constructor() {
    super();
    this.state = {
      source: "",
      vData: [],
      open: false,
    };
  }

  async componentDidMount() {
    const {
      source,
      data: { ...vData },
    } = await fetchVaccineData();
    const vArray = Object.values(vData);
    this.setState({ source, vData: vArray });
  }

  render() {

    return (
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          {this.state.vData.map((vData, index) => (
            <Grid item key={index}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Candidate</Typography>
                  <Typography variant="h5">{vData.candidate}</Typography>
                  <Typography color="textSecondary">Mechanism</Typography>
                  <Typography variant="body2">{vData.mechanism}</Typography>
                  <Typography color="textSecondary">Sponsor</Typography>
                  <Typography variant="body2">
                    {vData.sponsors.map((d, i) => `${d}, `)}
                  </Typography>
                  <Typography color="textSecondary">Trial Phase</Typography>
                  <Typography variant="body2">
                    {vData.trialPhase}
                  </Typography>
                  <Typography color="textSecondary">Institution</Typography>
                  <Typography variant="body2">
                    {vData.institutions.map((d, i) => `${d}, `)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
//get more details to pop up 
// use https://material-ui.com/components/dialogs/ OPEN DIALOG
// https://stackoverflow.com/questions/60961065/unable-to-use-usestate-in-class-component-react-js 

export default Vaccine;
