export const localRegionToENRegion = (item) => {
  const name = item.region || item.name || item.county;

  switch (name) {
    case 'mazowieckie':
      return 'masovian';
    case 'malopolskie':
      return 'lesser_poland';
    case 'dolnoslaskie':
      return 'lower_silesian';
    case 'kujawsko-pomorskie':
      return 'kuyavian-pomeranian';
    case 'lubelskie':
      return 'lublin';
    case 'lubuskie':
      return 'lubusz';
    case 'lodzkie':
      return 'łódź';
    case 'opolskie':
      return 'opole';
    case 'podkarpackie':
      return 'subcarpathian';
    case 'podlaskie':
      return 'podlaskie';
    case 'pomorskie':
      return 'pomeranian';
    case 'slaskie':
      return 'silesian';
    case 'swietokrzyskie':
      return 'świętokrzyskie';
    case 'warminsko':
      return 'warmian-masurian';
    case 'wielkopolskie':
      return 'greater_poland';
    case 'zachodniopomorskie':
      return 'west_pomeranian';


    case 'Hlavní město Praha':
      return 'prague';
    case 'Středočeský kraj':
      return 'central_bohemia';
    case 'Jihočeský kraj':
      return 'southwest';
    case 'Karlovarský kraj':
      return 'northwest';
    case 'Liberecký kraj':
      return 'northeast';
    case 'Kraj Vysočina':
      return 'southeast';
    case 'Olomoucký kraj':
      return 'central_moravia';
    case 'Moravskoslezský kraj':
      return 'moravia-silesia';

    case 'Bratislavský kraj':
      return 'bratislava';
  }

  return name;
}

export const getLastXDaysStats = (data, days = 7) => {
  if (!data || !data.length) {
    return null;
  }

  let i = data.length - 1;
  const result = [ data[i] ];
  let c = 0;
  while (i > 0 && c < days) {
    i--;
    if (new Date(result[result.length - 1].lastUpdatedAtApify).isSameDateAs(new Date(data[i].lastUpdatedAtApify))) {
      continue;
    }

    result.push(data[i]);
    c++;
  }

  return result.reverse();
}

export const getLastXDaysRegionStats = (data, region, days = 7) => {
  const stats = getLastXDaysStats(data, days);
  if (!stats || !stats.length) {
    return null;
  }

  const tmp = stats
    .map(item => {
      return {
        data: getRegionStats(item, region),
        timestamp: Date.parse(item.lastUpdatedAtApify),
      };
    });

  return tmp.filter(it => !!it.data);
}

export const getLastXDaysRegionInfections = (data, region, days = 7) => {
  const stats = getLastXDaysRegionStats(data, region, days);
  if (!stats || !stats.length) {
    return null;
  }

  return stats.map(item => {
    return {
      value: item.data.infectedCount,
      timestamp: item.timestamp
    }
  });
}

export const getGeneralStats = (stats) => {
  if (!stats) {
    return null;
  }

  return {
    infectedCount: stats.infected,
    deceasedCount: stats.deceased,
  };
}

export const getRegionStats = (stats, region) => {
  if (!stats) {
    return null;
  }

  if (!region) {
    return getGeneralStats(stats);
  }

  if (stats.deceasedByRegion) {
    const deceased = stats.deceasedByRegion
      .find(item => localRegionToENRegion(item) === region);
    const infected = stats.infectedByRegion
      .find(item => localRegionToENRegion(item) === region);

    if (!deceased || !infected) {
      return getGeneralStats(stats);
    }

    return {
      infectedCount: infected.value,
      deceasedCount: deceased.value,
    };
  } else if (stats.infectedByCounty) {
    const result = stats.infectedByCounty
      .find(item => localRegionToENRegion(item) === region);

    if (!result) {
      return getGeneralStats(stats);
    }

    return {
      infectedCount: result.infectedCount,
      deceasedCount: null,
    };
  } else {
    const result = stats.infectedByRegion
      .find(item => localRegionToENRegion(item) === region);

    if (!result) {
      return getGeneralStats(stats);
    }

    return {
      infectedCount: result.infectedCount,
      deceasedCount: result.deceasedCount,
    };
  }
};

Date.prototype.isSameDateAs = function(pDate) {
  return (
      this.getFullYear() === pDate.getFullYear() &&
      this.getMonth() === pDate.getMonth() &&
      this.getDate() === pDate.getDate()
  );
}

export const getCurrentRegionsStats = (data, region) => {
  if (!data || !data.length) {
    return null;
  }

  let currentStats = data[data.length - 1];
  return getRegionStats(currentStats, region);
}

export const getLastRegionsStats = (data, region) => {
  if (!data || !data.length) {
    return null;
  }

  let i = 1;
  while (new Date(data[data.length - i].lastUpdatedAtApify).isSameDateAs(new Date(data[data.length - i-1 ].lastUpdatedAtApify)))
  i++;

  const currentStats = data[data.length - i-1];
  return getRegionStats(currentStats, region);
}

export const getInfectedChange = (data, region) => {
  const current = getCurrentRegionsStats(data, region);
  const last = getLastRegionsStats(data, region);
  if (!current || !last || !current.infectedCount) {
    return null;
  }

  const diff = current.infectedCount - last.infectedCount;
  return numToStr(diff)
}

export const getDeceasedChange = (data, region) => {
  const current = getCurrentRegionsStats(data, region);
  const last = getLastRegionsStats(data, region);
  if (!current || !last || !current.deceasedCount) {
    return null;
  }

  const diff = current.deceasedCount - last.deceasedCount;
  return numToStr(diff)
}

export const numToStr = (num) => {
  if (num > 0) {
    return "+" + num;
  } else if (num < 0) {
    return num.toString();
  } else {
    return '0';
  }
}

export const getSectionsByCountryAndCategoryId = (state, country, categoryId) => {
  const data = state[country];
  if (!data) {
    return null;
  }

  return data.filter(item => item.categoryId === categoryId);
}

export const getSectionsByCountryAndString = (state, lang, country, searchString) => {
  const data = state[country];
  if (!data || !searchString) {
    return [];
  }

  const searchValue = searchString.toLowerCase();
  const result = [];

  data.forEach(item => {
    const text = item.content[lang];
    if (text && text.toLowerCase().includes(searchValue)) {
      result.push(item);
    }
  });

  return result;
};
