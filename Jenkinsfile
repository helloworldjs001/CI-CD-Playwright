pipeline {
    agent{
        docker{
            image 'node:latest'
            args '-u root:root'
        }
    }

    stages{
            stage("log the node version"){
                steps{
                    script{
                        sh 'node --version'
                    }
                }
            }

            stage("Install playwright"){
                steps{
                    sh '''
                    npm i -D @playwright/test
                    npx playwright install
                    npx playwright install-deps 
                    '''
                }
            }

            stage("List all the test cases"){
                steps{
                    sh '''
                    npx playwright test --list
                    '''
                }
            }
            

    }
}