import { addAutoClone ,getAutoCloneByProjectId} from '../../Services/autoclone/auto-clone-service';
import { redirect, json } from '@remix-run/react';

//create
export const action = async ({ request }) => {
  try {
    if (request.method === 'POST') {
      const formData = new URLSearchParams(await request.text());
      const projectId = formData.get('projectId');
      const periodType = formData.get('periodType');
      const repeat = formData.get('repeat');
      const endOnDate = formData.get('endOnDate');
      const endAfterOccurances = formData.get('endAfterOccurances');
      const endNever = formData.get('endNever');
      const monthlyType = formData.get('monthlyType');
      const day = formData.get('day');
      const repeatOnDateValue = formData.get('repeatOnDateValue');
      const monthRepeatOnDayValue = formData.get('monthRepeatOnDayValue');
      const monthRepeatOnDayValueOccurances = formData.get('monthRepeatOnDayValueOccurances');
      const startDate = formData.get('startDate');

      const { response, err } = await addAutoClone(
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
      );

      if (!err) {
        return redirect('/'); // Redirect to the appropriate page
      } else {
        console.error('Error adding auto clone:', err);
        return json({ error: 'Failed to add auto clone' }, { status: 500 });
      }
    } else {
      return json({ error: 'Invalid request method.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing action:', error);
    return json({ error: 'Internal server error.' }, { status: 500 });
  }
};

//get 
export const loader = async ({ params }) => {
  try {
    const projectId = params.projectId;
    
    const { response, err } = await getAutoCloneByProjectId(projectId);
    
    if (err) {
      console.error('Error getting auto clone by project id:', err);
      throw new Error('Failed to fetch auto clone data');
    }

    return json({ autoCloneData: response });
  } catch (error) {
    console.error('Error processing request:', error);
    throw error;
  }
};

//update 
export const action = async ({ request }) => {
    try {
      if (request.method === 'PUT') {
        const formData = new URLSearchParams(await request.text());
        const autoCloneData = {
          _id: formData.get('_id'),
          projectId: formData.get('projectId'),
          periodType: formData.get('periodType'),
          repeat: formData.get('repeat'),
          endOnDate: formData.get('endOnDate'),
          endAfterOccurances: formData.get('endAfterOccurances'),
          endNever: formData.get('endNever'),
          monthlyType: formData.get('monthlyType'),
          day: formData.get('day'),
          repeatOnDateValue: formData.get('repeatOnDateValue'),
          monthRepeatOnDayValue: formData.get('monthRepeatOnDayValue'),
          monthRepeatOnDayValueOccurances: formData.get('monthRepeatOnDayValueOccurances'),
          startDate: formData.get('startDate'),
        };
  
        const { response, err } = await updateAutoClone(autoCloneData);
        
        if (err) {
          console.error('Error updating auto clone:', err);
          return json({ error: 'Failed to update auto clone' }, { status: 500 });
        }
  
        return redirect('/'); 
      } else {
        return json({ error: 'Invalid request method.' }, { status: 400 });
      }
    } catch (error) {
      console.error('Error processing action:', error);
      return json({ error: 'Internal server error.' }, { status: 500 });
    }
  };
