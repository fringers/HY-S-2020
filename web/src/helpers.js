export const localRegionToENRegion = (name) => {
  switch (name) {
    case 'mazowieckie':
      return 'masovian';
    case 'malopolskie':
      return 'lesser_poland';
  }

  return name;
}

export const getLastXDaysStats = (data, days = 7) => {
  if (!data || !data.length) {
    return null;
  }

  return data.slice(Math.max(data.length - days, 0))
}

export const getLastXDaysRegionStats = (data, region, days = 7) => {
  const stats = getLastXDaysStats(data, days);
  if (!stats || !stats.length) {
    return null;
  }

  return stats
    .map(item => item.infectedByRegion
      .find(item => localRegionToENRegion(item.region) === region));
}

export const getLastXDaysRegionInfections = (data, region, days = 7) => {
  const stats = getLastXDaysRegionStats(data, region, days);
  if (!stats || !stats.length) {
    return null;
  }

  return stats.map(item => item.infectedCount);
}

export const getCurrentRegionsStats = (data, region) => {
  if (!data || !data.length || !region) {
    return null;
  }

  const currentStats = data[data.length - 1];
  return currentStats.infectedByRegion
    .find(item => localRegionToENRegion(item.region) === region);
}

export const getLastRegionsStats = (data, region) => {
  if (!data || !data.length || !region) {
    return null;
  }

  const currentStats = data[data.length - 3];
  return currentStats.infectedByRegion
    .find(item => localRegionToENRegion(item.region) === region);
}

export const getInfectedChange = (data, region) => {
  const current = getCurrentRegionsStats(data, region);
  const last = getLastRegionsStats(data, region);
  if (!current || !last) {
    return '0';
  }

  const diff = current.infectedCount - last.infectedCount;
  return numToStr(diff)
}

export const getDeceasedChange = (data, region) => {
  const current = getCurrentRegionsStats(data, region);
  const last = getLastRegionsStats(data, region);
  if (!current || !last) {
    return '0';
  }

  const diff = current.deceasedCount - last.deceasedCount;
  return numToStr(diff)
}

export const numToStr = (num) => {
  if (num > 0) {
    return "+" + num;
  } else if (num < 0) {
    return "-" + num;
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
