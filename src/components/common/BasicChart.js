export default function BasicChart({ data, settings }) {
  // Define theme styles
  const theme = Object.assign({
    styles: {
      table: {},
      yAxis: {
        padding: '0px 15px 0px 15px',
        color: '#3d464d',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        borderRight: '1px solid #adadad'
      },
      xAxis: {
        padding: '7.5px',
        textAlign: 'center',
        borderTop: '1px solid #adadad',
        color: '#5b5b5b',
        textTransform: 'uppercase'
      },
      barContainer: {
        width: '100%'
      },
      bars: {
        margin: '0px 12.5px 12.5px 12.5px',
        height: '30px',
        transition: 'width 250ms',
        background: '#a0a0a0',
        display: 'block',
      },
      score: {
        color: '#5d5d5d',
        fontSize: '15px',
        position: 'relative',
        right: '-100%',
        marginLeft: '5px',
        top: '18%'
      },
      bottomCell: {
        borderTop: '1px solid #adadad',
        borderRight: '1px solid #adadad'
      },
      noData: {
        textAlign: 'center',
        padding: '100px'
      }
    },
    labels: {
      xAxis: 'Time'
    }
  }, settings);

  const maxValue = Math.max(...data.map(row => row.score));

  return (
    <table className="inferno-basic-chart" style={theme.styles.table}>
      <tbody>
      {data.map((row) => {
        return (
          <tr>
            <td style={theme.styles.yAxis}>{row.label}</td>
            <td style={theme.styles.barContainer}>
              <div style={Object.assign({}, theme.styles.bars, {
                width: `${(row.score / maxValue) * 100}%`,
                background: row.bg ? row.bg : theme.styles.bars.background
              })}>
                {row.score ? <figure style={theme.styles.score}>{row.score}</figure> : ''}
              </div>
            </td>
          </tr>
        );
      })}
      {!data.length ? <tr>
        <td style={theme.styles.yAxis}>&nbsp;</td>
        <td style={theme.styles.noData} colSpan="2">No data has been supplied.</td>
      </tr> : null}
      <tr>
        <td style={theme.styles.bottomCell}>&nbsp;</td>
        <td style={theme.styles.xAxis}>{theme.labels.xAxis}</td>
      </tr>
      </tbody>
    </table>
  );
}
