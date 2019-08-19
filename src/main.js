import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';

async function commitChanges(targetDirectory) {
  try{
    const result = await execa('git', ['commit','-m','Saved files in emergency'], {
      cwd: targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to commit the changes'));
    }
  }catch(e){
    console.log(e)
  }
 return;
}

async function pushChanges(targetDirectory) {
  try{
    const result = await execa('git', ['push','origin','feuer_branch'], {
      cwd: targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to commit the changes'));
    }
  }catch(e){
    console.log(e)
  }
 return;
}

async function addToGit(targetDirectory) {
  try{
    const result = await execa('git', ['add','--all'], {
      cwd: targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to add all files'));
    }
  }catch(e){
    console.log(e)
  }
 return;
}

async function newBranch(targetDirectory) {
  try{
    const result = await execa('git', ['checkout','-b','feuer_branch'], {
      cwd: targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to checkout new branch'));
    }
  }catch(e){
    console.log(e)
  }
 return;
}

export async function fire() {
  const targetDirectory = process.cwd();

 const tasks = new Listr([
   {
     title: 'Add to git',
     task: () => addToGit(targetDirectory),
     enabled: () => true,
   },
   {
    title: 'Checkout new branch',
    task: () => newBranch(targetDirectory),
    enabled: () => true,
  },
  {
    title: 'Commit the changes',
    task: () => commitChanges(targetDirectory),
    enabled: () => true,
  },
  {
    title: 'Push the changes to github',
    task: () => pushChanges(targetDirectory),
    enabled: () => true,
  },
 ]);

 await tasks.run();
 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}
