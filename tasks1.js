const taskA = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task A completed');
      resolve('data from Task A');
    }, 1000);
  });
};

const taskB = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('task B completed');
      resolve('Data from Task B');
    }, 1000);
  });
};

const taskC = (dataFromA) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('task C completed with:', dataFromA);
      resolve('data from Task C');
    }, 1000);
  });
};

const taskD = (dataFromB, dataFromC) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('task D completed with:', dataFromB, 'and', dataFromC);
      resolve('Data from task D');
    }, 1000);
  });
};

const taskE = (dataFromD) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('task E completed with:', dataFromD);
      resolve('Data from task E');
    }, 1000);
  });
};

async function mainTask() {
  try {
    const dataFromA = await taskA();
    const dataFromB = await taskB();
    // console.log({dataFromA,dataFromB})

    // Task C depends on Task A
    const dataFromC = await taskC(dataFromA);
    // console.log(dataFromC)

    // D depends on B and C
    const dataFromD = await taskD(dataFromB, dataFromC);

    // Task E depends on D
    const dataFromE = await taskE(dataFromD);

    // console.log({dataFromE});
  } catch (err) {
    console.error('Error msg', err);
  }
}

mainTask();
