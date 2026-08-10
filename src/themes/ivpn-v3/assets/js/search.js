import { createApp } from 'vue'
import lunr from 'lunr'
import matomo from '@/api/matomo.js'

const app = createApp({
    collection: [],
    mounted() {
        this.collection = []
    },
    methods: {
        submitSearch() {
            const query = this.$refs.form.search.value

            if (query) {
                if (this.collection.length) {
                    this.search(this.collection, query)
                } else {
                    this.fetchAndSearch(query)
                }
            } else {
                this.updateNav()
                this.renderTitle([], query)
                this.renderList([])
            }
        },
        fetchAndSearch(query) {
            // Derive locale from the current URL path (/en/..., /es/..., etc.)
            // so the correct per-locale index is fetched. Fall back to 'en'.
            const knownLocales = ['en', 'es'];
            const firstSegment = window.location.pathname.split('/').filter(Boolean)[0] || '';
            const locale = knownLocales.includes(firstSegment) ? firstSegment : 'en';
            fetch(`/${locale}/pages/index.json`)
                .then(response => {
                    if (!response.ok) {
                        // Try the English index as a fallback
                        return fetch('/en/pages/index.json').then(r => r.json());
                    }
                    return response.json();
                })
                .then(data => {
                    this.collection = data
                    this.search(data, query)
                })
                .catch(() => {
                    this.renderTitle([], query)
                    this.renderList([])
                });
        },
        search(data, query) {
            var idx = lunr(function () {
                this.ref("url")
                this.field("title")

                data.forEach(function (doc) {
                    this.add(doc)
                }, this)
            })

            const collection = idx.search(query + "~1").map(function (result) {
                return data.filter(function (page) {
                    return page.url === result.ref
                })[0]
            })

            matomo.recordSearch(query, collection.length)

            this.updateNav()
            this.renderTitle(collection, query)
            this.renderList(collection)
        },
        updateNav() {
            const nav = document.querySelector('#nav')
            const array = [...nav.children]

            array.forEach(function(link) {
                link.removeAttribute("class")
            })
        },
        renderTitle(collection, query) {
            const main = document.querySelector('#main')
            main.innerHTML = ""

            const h2 = document.createElement("h2")
            h2.textContent = collection.length + ' search results for "' + query + '"'

            main.appendChild(h2)
        },
        renderList(collection) {
            const main = document.querySelector('#main')
            const ul = document.createElement("ul")

            collection.forEach(function (article) {
                const li = document.createElement("li")
                const a = document.createElement("a")
                a.textContent = article.title
                a.href = article.url

                li.appendChild(a)
                ul.appendChild(li)
            })

            main.appendChild(ul)
        }
    }
})
app.mount('#search')
