import {asyncHandler} from '../utils/asyncHandler';


const register = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User registered successfully'
    });
});

export default {
    register
}


