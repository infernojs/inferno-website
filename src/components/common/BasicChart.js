import Inferno from 'inferno';

export default function BasicChart({ data, settings }) {
  // Define data to power the chart
  // let data = chartData ? chartData : [
  //   { label: 'Inferno', value: 0.3, bg: 'rgb(242, 63, 63)' },
  //   { label: 'Angular 2', value: 0.6 },
  //   { label: 'Ember', value: 0.65 },
  //   { label: 'React', value: 0.8 },
  //   { label: 'VueJS', value: 0.95 }
  // ];
  // Define theme styles
  const theme = Object.assign(
    {
      styles: {
        table: {},
        yAxis: {
          padding: '0px 15px 0px 15px',
          color: '#3d464d',
          whiteSpace: 'nowrap',
          textAlign: 'right',
          borderRight: '1px solid rgb(242, 63, 63)'
        },
        xAxis: {
          padding: '7.5px',
          textAlign: 'center',
          borderTop: '1px solid rgb(242, 63, 63)',
          color: 'rgb(242, 63, 63)',
          textTransform: 'uppercase'
        },
        barContainer: {
          width: '100%'
        },
        bars: {
          margin: '0px 12.5px 12.5px 12.5px',
          height: '30px',
          transition: 'width 250ms',
          background: 'rgb(124, 124, 124)',
          display: 'block'
        },
        bottomCell: {
          borderTop: '1px solid rgb(242, 63, 63)',
          borderRight: '1px solid rgb(242, 63, 63)'
        }
      },
      labels: {
        xAxis: 'Time'
      }
    },
    settings
  );
  return (
    <table className="inferno-basic-chart" style={ theme.styles.table }>
      {
        data.map((row) => {
          return (
            <tr>
              <td style={ theme.styles.yAxis }>{ row.label }</td>
              <td style={ theme.styles.barContainer }>
                <div style={
                  Object.assign(
                    {}, theme.styles.bars, {
                      width: `${row.value * 100}%`,
                      background: row.bg ? row.bg : theme.styles.bars.background
                    }
                  )
                }>&nbsp;</div>
              </td>
            </tr>
          )
        })
      }
      <tr>
        <td style={ theme.styles.bottomCell }>&nbsp;</td>
        <td style={ theme.styles.xAxis}>{ theme.labels.xAxis }</td>
      </tr>
    </table>
  );
}