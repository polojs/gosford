interface Testmonial {
    photo?: string,
    comment: string,
    name: string,
    type: string
}

interface member {
    photo: string,
    name: string,
    title: string
}

export const customSay: Testmonial[] = [
    {
        photo: "assets/images/testimonials/user-1.jpg",
        comment: "“We returned for a second visit after visiting The Lambing Shed last year and enjoyed it just as much as before with the added bonus of the canopy being added to the patio. Ideal location for exploring Devon as just off the A30. Quiet and relaxing location with excellent views across the countryside. Would recommend this to anyone looking for a relaxing holiday with the opportunity to explore Devon.”",
        name: "Mark",
        type: "Customer"
    },
    {
        photo: "assets/images/testimonials/user-2.jpg",
        comment: "“The cottage was absolutely lovely. Well equipped, very clean and in a beautiful setting. The owners were very welcoming, just the right balance of being friendly but not intrusive. We had lambs and chickens right outside the back door and great views across the fields. The farm shop was well worth a visit for fresh eggs and amazing pasties and the village was a half hour walk away. Great walks and bike rides in the area and only 20 mins from the beach.”",
        name: "Sarah",
        type: "Customer"
    }
]

export const team: member[]  = [
    {
        photo: "assets/images/team/member-1.jpg",
        name: "Samanta Grey",
        title: "Founder & CEO"
    },
    {
        photo: "assets/images/team/member-2.jpg",
        name: "Bruce Sutton",
        title: "Sales & Marketing Manager"
    },
    {
        photo: "assets/images/team/member-3.jpg",
        name: "Janet Joy",
        title: "Product Manager"
    }
]

export const brands = [
    {
        name: "brand",
        image: "assets/images/brands/1.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/2.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/3.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/4.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/5.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/6.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/7.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/8.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/9.png"
    }
]