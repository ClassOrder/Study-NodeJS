module.exports = {
    index: (req, res) => {
        res.send("The image: Index Controller" + req.params.image_id);
    },
    create: (req, res) => {
        res.send("The image: Create POST Controller");
    },
    like: (req, res) => {
        res.send("The image: Like POST Controller");
    },
    comment: (req, res) => {
        res.send("The image: Comment POST Controller");
    }
};