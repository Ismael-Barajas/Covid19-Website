import { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Container,
  Dialog,
  IconButton,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import { fetchVaccineData } from "../../api";
import styles from "./Vaccine.module.css";

class Vaccine extends Component {
  constructor() {
    super();
    this.state = {
      source: "",
      vData: [],
      showModal: 0,
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

  getModal = (value) => {
    this.setState({ showModal: value, open: true });
  };

  hideModal = () => {
    this.setState({ showModal: 0, open: false });
  };

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
              <Card className={styles.cards}>
                <CardContent>
                  <Typography color="textSecondary">Candidate</Typography>
                  <Typography variant="h5">{vData.candidate}</Typography>
                  <br />
                  <Typography color="textSecondary">Mechanism</Typography>
                  <Typography variant="body2">{vData.mechanism}</Typography>
                  <Typography color="textSecondary">Sponsor</Typography>
                  <Typography variant="body2">
                    {vData.sponsors.map((d, i) => <li
                          dangerouslySetInnerHTML={{ __html: d }}
                        />)}
                  </Typography>
                  <Typography color="textSecondary">Trial Phase</Typography>
                  <Typography variant="body2">{vData.trialPhase}</Typography>
                  <Typography color="textSecondary">Institution</Typography>
                  <Typography variant="body2">
                    {vData.institutions.map((d, i) => <li
                          dangerouslySetInnerHTML={{ __html: d }}
                        />)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => this.getModal(index)}
                  >
                    Learn More
                  </Button>
                  <Dialog
                    onClose={() => this.hideModal()}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open && this.state.showModal === index}
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={() => this.hideModal()}
                      className={styles.dialog}
                    >
                      Details
                      <IconButton
                        aria-label="close"
                        onClick={() => this.hideModal()}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent dividers className={styles.dialog}>
                      <Typography gutterBottom>
                        <p
                          dangerouslySetInnerHTML={{ __html: vData.details }}
                        />
                      </Typography>
                    </DialogContent>
                  </Dialog>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default Vaccine;
