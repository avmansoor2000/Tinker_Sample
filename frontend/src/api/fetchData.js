// fetchData.js
export async function fetchData() {
  try {
    const response = await fetch('https://app-api.tinkerhub.org/checkin/active');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    console.log(data,'data');


    // console.log(result,'result');
    // const data = result.data;
    // console.log(data,'data');

    const seenMids = new Set();
    const uniqueData = data.filter(item => {
      if (seenMids.has(item.mid)) {
        return false;
      } else {
        seenMids.add(item.mid);
        return true;
      }
    });
    console.log(uniqueData+'uniqueData');


    // Filter data based on checkOutTime
    const currentTime = new Date();
    const filteredData = uniqueData.filter(item => {
      const checkOutTime = new Date(item.checkOutTime);
      return checkOutTime > currentTime; // Filter items with checkOutTime in the future
    });
    // console.log(filteredData,'filteredData ');

    // Calculate remaining time for each item
    const dataWithRemainingTime = filteredData.map(item => {
      const checkOutTime = new Date(item.checkOutTime);
      const remainingTime = checkOutTime - currentTime;
      return { ...item, remainingTime };
    });

    // Sort data by remaining time
    const sortedData = dataWithRemainingTime.sort((a, b) => a.remainingTime - b.remainingTime);
    // console.log(sortedData+'sortedData');

    // console.log(sortedData,'sortedData');

  
    const frontData = sortedData.slice(0, 28) 
    const backData = sortedData.slice(28, 56)
    const totalMembers = data.length;

    return { frontData, backData, totalMembers };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
