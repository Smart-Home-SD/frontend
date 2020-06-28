import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: '100%',
      height: '25rem',
    },
  },
}));

const title = {
  'font-size': '1.2rem',
  'font-weight': 'bolder',
};

const TitleText = (props) => <Title.Text {...props} style={title} />;

function HistoryChart(props) {
  const classes = useStyles();
  const { name, data } = props;
  return (
    <div className={classes.root}>
      <Paper>
        <Chart
          height={350}
          data={data}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <Title
            text={`Histórico de ${name}`}
            textComponent={TitleText}
          />

          <LineSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </div>
  );
}

HistoryChart.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HistoryChart;
