import { serviceHost } from '../../common/const';
import ServiceRequest from  '../../utils/service-request';
import Group from "../../models/group/group-model";

export async function getAllGroups() {
    return Group.find({}, 'groupName groupMembers isDeleted');
}

export async function addGroup(groupName, groupMembers, isDeleted) {
    try {
        const newGroup = await Group.create({
            groupName,
            groupMembers,
            isDeleted,
        });
        
        return { response: newGroup, err: null };
    } catch (error) {
        console.error("Error saving group:", error);
        return { response: null, err: error };
    }
}

export async function editGroup(id, updatedGroup) {
    try {
        const result = await Group.findByIdAndUpdate(id, updatedGroup, { new: true });
        if (result) {
            return { success: true, result };
        } else {
            throw new Error("Group not found");
        }
    } catch (error) {
        console.error("Error updating group:", error);
        return { success: false, error };
    }
}

export async function deleteGroup(id) {
    try {
        const result = await Group.deleteOne({ _id: id });
        return { success: true, result };
    } catch (error) {
        console.error("Error deleting group:", error);
        return { success: false, error };
    }
}
