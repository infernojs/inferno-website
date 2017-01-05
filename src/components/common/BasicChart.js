import Inferno from 'inferno';

export default function BasicChart({ data, settings }) {
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
          borderTop: '1px solid #e41f1c',
          color: '#e41f1c',
          textTransform: 'uppercase'
        },
        barContainer: {
          width: '100%'
        },
        bars: {
          margin: '0px 12.5px 12.5px 12.5px',
          height: '30px',
          transition: 'width 250ms',
          background: '#545454',
          display: 'block',
        },
        score: {
          color: 'rgb(93, 93, 93)',
          fontSize: '11px',
          position: 'relative',
          right: '-100%',
          marginLeft: '5px',
          top: '24%'
        },
        bottomCell: {
          borderTop: '1px solid #e41f1c',
          borderRight: '1px solid #e41f1c'
        },
        noData: {
          textAlign: 'center',
          padding: '100px'
        }
      },
      labels: {
        xAxis: 'Time'
      }
    },
    settings
  );

  const maxValue = Math.max(...data.map(row => row.score ))

  return (
    <table className="inferno-basic-chart" style={ theme.styles.table }>
        <tbody>
            {data.map((row) => {
                return (
                <tr>
                    <td style={ theme.styles.yAxis }>{ row.label }</td>
                    <td style={ theme.styles.barContainer }>
                        <div style={
                            Object.assign(
                            {}, theme.styles.bars, {
                                width: `${(row.score / maxValue) * 100}%`,
                                background: row.bg ? row.bg : theme.styles.bars.background
                            })
                        }>
                          { row.score ? <figure style={ theme.styles.score }>{ row.score }</figure> : '' }
                        </div>
                    </td>
                </tr>
                )
            })}
          {
            (data.length == 0) ?
              <tr>
                <td style={ theme.styles.yAxis }>&nbsp;</td>
                <td style={ theme.styles.noData } colSpan="2">No data has been supplied.</td>
              </tr> : null
          }
          <tr>
            <td style={ theme.styles.bottomCell }>&nbsp;</td>
            <td style={ theme.styles.xAxis}>{ theme.labels.xAxis }</td>
          </tr>
        </tbody>
    </table>
  );
}
