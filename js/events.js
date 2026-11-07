// Eventora's single source of event data.
// The homepage, event listing, details page and registration form all use this array.

const eventoraEvents = [
    {
        id: 1,
        name: "Tech Summit 2026",
        category: "Technology",
        date: "2026-11-20",
        time: "10:00 AM – 5:00 PM",
        venue: "KIIT Convention Centre, Bhubaneswar",
        price: "Free",
        description: "Explore the future of AI, software, cybersecurity and emerging technology with developers, researchers and industry leaders.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
        featured: true
    },
    {
        id: 2,
        name: "Music Festival",
        category: "Music",
        date: "2026-11-28",
        time: "4:00 PM – 10:00 PM",
        venue: "Eco Park, Kolkata",
        price: "₹499 onwards",
        description: "Experience an evening of live music, energetic performances and great company at an open-air music festival.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
        featured: true
    },
    {
        id: 3,
        name: "Startup Networking Meetup",
        category: "Networking",
        date: "2026-12-05",
        time: "11:00 AM – 3:00 PM",
        venue: "The Park, Bengaluru",
        price: "₹299",
        description: "Meet founders, students, creators and professionals. Exchange ideas, build connections and learn from people building new ventures.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
        featured: true
    },
    {
        id: 4,
        name: "Future of Business Conference",
        category: "Business",
        date: "2026-12-12",
        time: "9:30 AM – 4:30 PM",
        venue: "ITC Royal Bengal, Kolkata",
        price: "₹799 onwards",
        description: "A conference on entrepreneurship, digital business, leadership and the ideas shaping tomorrow's organisations.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
        featured: false
    }
];

// Make the event data available to registration.js.
window.EventoraEvents = eventoraEvents;

function formatEventDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function createEventCard(event) {
    return `
        <article class="event-card">
            <a class="event-image-link" href="event-details.html?id=${event.id}" aria-label="View ${event.name} details">
                <img class="event-image" src="${event.image}" alt="${event.name}" loading="lazy">
                <span class="image-category">${event.category}</span>
            </a>
            <div class="event-info">
                <p class="event-date">${formatEventDate(event.date)} <span>•</span> ${event.time}</p>
                <h3><a href="event-details.html?id=${event.id}">${event.name}</a></h3>
                <p class="event-description">${event.description}</p>
                <div class="event-card-bottom">
                    <span class="event-venue">⌖ ${event.venue}</span>
                    <a class="card-link" href="event-details.html?id=${event.id}">View details →</a>
                </div>
            </div>
        </article>
    `;
}

function renderEventCards(eventList, container) {
    if (!container) return;

    if (eventList.length === 0) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = eventList.map(createEventCard).join("");
}

// Homepage: show featured events.
const featuredEventsContainer = document.getElementById("featuredEvents");
if (featuredEventsContainer) {
    const featuredEvents = eventoraEvents.filter(event => event.featured);
    renderEventCards(featuredEvents, featuredEventsContainer);
}

// Explore page: search and category filters.
const allEventsContainer = document.getElementById("allEvents");
if (allEventsContainer) {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const eventCount = document.getElementById("eventCount");
    const noEvents = document.getElementById("noEvents");
    const clearFiltersButton = document.getElementById("clearFilters");

    function filterEvents() {
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedCategory = categoryFilter ? categoryFilter.value : "All";

        const filteredEvents = eventoraEvents.filter(event => {
            const searchableText = `${event.name} ${event.category} ${event.venue} ${event.description}`.toLowerCase();
            const matchesSearch = searchableText.includes(searchText);
            const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderEventCards(filteredEvents, allEventsContainer);

        if (eventCount) {
            eventCount.textContent = `Showing ${filteredEvents.length} of ${eventoraEvents.length} events`;
        }

        if (noEvents) {
            noEvents.hidden = filteredEvents.length !== 0;
        }
    }

    if (searchInput) searchInput.addEventListener("input", filterEvents);
    if (categoryFilter) categoryFilter.addEventListener("change", filterEvents);

    if (clearFiltersButton) {
        clearFiltersButton.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            if (categoryFilter) categoryFilter.value = "All";
            filterEvents();
        });
    }

    filterEvents();
}

// Event details page: read the event ID from the URL, e.g. event-details.html?id=1.
const eventDetailsContainer = document.getElementById("eventDetails");
if (eventDetailsContainer) {
    const params = new URLSearchParams(window.location.search);
    const eventId = Number(params.get("id"));
    const selectedEvent = eventoraEvents.find(event => event.id === eventId);

    if (selectedEvent) {
        eventDetailsContainer.innerHTML = `
            <article class="event-detail-card">
                <div class="detail-image-wrap">
                    <img class="detail-image" src="${selectedEvent.image}" alt="${selectedEvent.name}">
                    <span class="image-category">${selectedEvent.category}</span>
                </div>
                <div class="detail-content">
                    <span class="eyebrow">EVENT DETAILS</span>
                    <h1>${selectedEvent.name}</h1>
                    <p class="detail-description">${selectedEvent.description}</p>
                    <div class="detail-facts">
                        <div><span class="fact-label">Date</span><strong>${formatEventDate(selectedEvent.date)}</strong></div>
                        <div><span class="fact-label">Time</span><strong>${selectedEvent.time}</strong></div>
                        <div><span class="fact-label">Venue</span><strong>${selectedEvent.venue}</strong></div>
                        <div><span class="fact-label">Entry</span><strong>${selectedEvent.price}</strong></div>
                    </div>
                    <div class="detail-actions">
                        <a class="btn btn-primary" href="register.html?eventId=${selectedEvent.id}">Register for this event →</a>
                        <a class="btn btn-secondary" href="events.html">Browse other events</a>
                    </div>
                </div>
            </article>
        `;
    } else {
        eventDetailsContainer.innerHTML = `
            <div class="not-found-state">
                <span class="eyebrow">NOT FOUND</span>
                <h1>Event not found</h1>
                <p>That event link may be incorrect. Browse the event list to choose an available event.</p>
                <a class="btn btn-primary" href="events.html">Explore events →</a>
            </div>
        `;
    }
}
