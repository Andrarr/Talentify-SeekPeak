

export const uploadsFolder = (req, res) => {
    const { img } = req.params;
    try {
        res.render(img)
    }
    catch (err) {
        throw { message: "File not found!" }
    }
}