// fetchData.js
export async function fetchData() {
    try {
      const response = await fetch('https://app-api.tinkerhub.org/checkin/active');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      
      const data = await response.json();
      console.log(data);
      // console.log();
      // console.log(result,'result');
      // const data = result.data;
  
      // Assuming you want to split the data into two equal parts
      // const midIndex = Math.floor(data.length / 2);
      const frontData = data.slice(0, 35);
      const backData = data.slice(35,70);
      // console.log(backData,'bk Fetched Data');
      const totalMembers = data.length;
  
      return { frontData, backData, totalMembers };
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  