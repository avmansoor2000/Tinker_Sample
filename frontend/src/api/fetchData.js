// fetchData.js
export async function fetchData() {
  try {
    const response = await fetch('https://app-api.tinkerhub.org/checkin/active');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    console.log(data);

    const seenMids = new Set();
    const uniqueData = data.filter(item => {
      if (seenMids.has(item.mid)) {
        return false;
      } else {
        seenMids.add(item.mid);
        return true;
      }
    });
    // console.log();
    // console.log(result,'result');
    // const data = result.data;

  
    const frontData = uniqueData.slice(0, 28);
    const backData = uniqueData.slice(28, 56);
    const totalMembers = data.length;

    return { frontData, backData, totalMembers };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
