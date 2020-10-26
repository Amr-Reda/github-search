let form = document.getElementById('searchForm');
let searchQuery = document.getElementById('search');
let sort = document.getElementById('sort');
let results = document.getElementById('results');
let ownerInfoModelLabel = document.getElementById('ownerInfoModelLabel');
let followers = document.getElementById('followers');
let following = document.getElementById('following');
let repositories = document.getElementById('repositories');

const spinnerElement = `
<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
`
form.addEventListener('submit', handleForm);

async function handleForm(event) {
    event.preventDefault();
    
    //add loading spinner
    results.innerHTML = spinnerElement

    //featch repo owner data
	const data = await fetch(
		`/search?q=${searchQuery.value}&sort=${sort.value}`
	).then((response) => response.json());

    //attach data to dom
    let htmlNodes = ''
    for (const element of data) {
        htmlNodes += getHtmlNodes(element)
    }
    results.innerHTML = htmlNodes

    //add listener on more info btn
    for (const element of data) {
        let form = document.getElementById(element.id);
        form.addEventListener('submit', handleOwnerInfo);
    }
}

async function handleOwnerInfo(event) {
    event.preventDefault();

    //add loading spinner
    event.target[1].innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Show owner stats'

    //featch repo owner data
    const userInfoLink = event.target[0].value
    const data = await fetch(userInfoLink).then((response) => response.json());

    //attach data to dom
    ownerInfoModelLabel.innerHTML = data.login
    followers.value = data.followers
    following.value = data.following
    repositories.value = data.public_repos

    //lunch modal
    $('#ownerInfoModel').modal('toggle')

    //remove loading spinner
    event.target[1].innerHTML = 'Show owner stats'
}

function getHtmlNodes(element) {
    let {repoName, ownerName, stars, forks, ownerUrl, id} = element
 
    let node = `<div class="row h-100 justify-content-center align-items-center">
                <div class="card w-75 my-3">
                    <div class="card-body">
                        <h5 class="card-title"><b>Repository Name: </b> {{repoName}}</h5>
                        <p class="card-text"><b>Owner: </b> {{ownerName}}</p>
                        <p class="card-text"><b>Stars: </b> {{stars}}</p>
                        <p class="card-text"><b>Forks: </b> {{forks}}</p>
                        <form id="{{id}}">
                            <input type="hidden" value="{{ownerUrl}}">
                            <button class="btn btn-success float-right">Show owner stats</button>
                        </form>
                    </div>
                </div>
            </div>`

    node = node.replace("{{repoName}}", repoName)
    node = node.replace("{{ownerName}}", ownerName)
    node = node.replace("{{stars}}", stars)
    node = node.replace("{{forks}}", forks)
    node = node.replace("{{ownerUrl}}", ownerUrl)
    node = node.replace("{{id}}", id)

    return node
}