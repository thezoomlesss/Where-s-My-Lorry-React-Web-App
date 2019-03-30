import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import Grow from '@material-ui/core/Grow';

class CompanySettings extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.setState({
            yearlyGoal: null
        });
    }

    componentDidMount() {

        fetch('/getYearlyGoal/?cid=1')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    yearlyGoal: Math.round(data['yearly_goal'] / 12)
                })
            });
    }

    onValueChange(event) {
        this.setState({
            yearlyGoal: event.target.value
        }, () => {
        });
    }


    onSubmit(event) {
        // pareseInt to extract the integer and isNaN to double check if it's an int or if it isn't anything at all (e.g. empty or space)
        if (!isNaN(parseInt(this.state.yearlyGoal))) {
            // alert(this.state.yearlyGoal*12);
            var yearly_goal = this.state.yearlyGoal.trim() * 12;
            fetch('/setYearlyGoal?cid=1&goal=' + yearly_goal, { method: 'PUT' })
                .then(res => res.status === 200 ? this.props.enqueueSnackbar('Montly goal updated.', { variant: 'success' }) : this.props.enqueueSnackbar('Could not set the new goal', { variant: 'error' }));
        }
    }

    render() {

        if (this.state) {
            return (
                <div>
                    <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="SettingsPaper">
                            <Typography component="h1" variant="h5">
                                Settings
                        </Typography>
                            <div className="singleSetting">
                                <FormControl margin="normal" className="inrowSetting">
                                    <InputLabel htmlFor="text" >Monthly goal of </InputLabel>
                                    <Input placeholder={"Current value: " + this.state.yearlyGoal} id="yearlyGoal" onChange={this.onValueChange} name="yearlyGoal" autoComplete="yearlyGoal" autoFocus />
                                </FormControl>
                                <Button
                                    className="inrowSetting settingButton"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onSubmit}
                                >Set Monthly Goal</Button>
                            </div>
                        </Paper>
                    </Grow>
                    {/* <SimpleSnackbar /> */}
                </div>
            );
        } else {
            console.log("NOOO")
            return null;
        }
    }
}

export default withSnackbar(CompanySettings)