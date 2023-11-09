import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry != null && onPerfEntry instanceof Function) {
    // tslint:disable-next-line:no-floating-promises
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }): void => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((err) => console.log(err));
  }
};

export default reportWebVitals;
