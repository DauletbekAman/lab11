from django.http import JsonResponse
from api.models import Task, TaskList

def task_lists(request):
    list = TaskList.objects.all();
    json_task_list = [val.to_json() for val in list]
    return JsonResponse(json_task_list, safe=False)

def task_list_detail(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe = False)

    return JsonResponse(task_list.to_json())

def task_list_tasks(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe="False")

    tasks = task_list.tasks.all()
    json_tasks = [t.to_json_list() for t in tasks]
    return JsonResponse(json_tasks, safe=False)


def task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe="False")

    return JsonResponse(task.to_json_detail())
