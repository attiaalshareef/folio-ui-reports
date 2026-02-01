exports.format = msgs => {
  const results = {};
  // console.log(Object.entries(msgs));
  for (const [id, msg] of Object.entries(msgs)) {
    if (id.startsWith('ui-reports.')) {
      results[id.replace('ui-reports.', '')] = msg.defaultMessage
        ? msg.defaultMessage
        : '';
    }
  }
  return results;
};
