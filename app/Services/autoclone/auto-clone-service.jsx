import AutoClone from '../../models/autoclone/auto-clone-model';

// export const addAutoClone = async (period) => {
//     try {
//         const newAutoClone = await AutoClone.create(period);
//         return { response: newAutoClone, err: null };
//     } catch (err) {
//         console.error('Error adding auto clone:', err);
//         return { response: null, err };
//     }
// };
export const addAutoClone = async (
    projectId,
    periodType,
    repeat,
    endOnDate,
    endAfterOccurances,
    endNever,
    monthlyType,
    day,
    repeatOnDateValue,
    monthRepeatOnDayValue,
    monthRepeatOnDayValueOccurances,
    startDate
  ) => {
    try {
      const newAutoClone = await AutoClone.create({
        projectId,
        periodType,
        repeat,
        endOnDate,
        endAfterOccurances,
        endNever,
        monthlyType,
        day,
        repeatOnDateValue,
        monthRepeatOnDayValue,
        monthRepeatOnDayValueOccurances,
        startDate
      });
  
      return { response: newAutoClone, err: null };
    } catch (err) {
      console.error("Error adding auto clone:", err);
      return { response: null, err };
    }
  };

export const getAutoCloneByProjectId = async (projectId) => {
    try {
        const autoCloneData = await AutoClone.findOne({ projectId });
        return { response: autoCloneData, err: null };
    } catch (err) {
        console.error('Error getting auto clone by project id:', err);
        return { response: null, err };
    }
};

export const updateAutoClone = async (period) => {
    try {
        const updatedAutoClone = await AutoClone.findOneAndUpdate({ _id: period._id }, period, { new: true });
        return { response: updatedAutoClone, err: null };
    } catch (err) {
        console.error('Error updating auto clone:', err);
        return { response: null, err };
    }
};
