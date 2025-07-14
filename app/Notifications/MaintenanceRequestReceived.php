<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\MaintenanceRequest;

class MaintenanceRequestReceived extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct( private MaintenanceRequest $maintenanceRequest)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $request = $this->maintenanceRequest;
        $unit = $request->unit;
        $tenant = $request->tenant;

        return(new MailMessage)
        ->subject('New Maintenance Request Received')
        ->greeting('Hello ' . $notifiable->user_name . ',')
        ->line('A new maintenance request has been submitted for one of your properties.')
        ->line('**Property:**' . $unit->address . ' - Unit ' . $unit->unit_number)
        ->line('**Tenant:**' . $tenant->user_name)
        ->line('**Priority Level:**' . ucfirst($request->priority_level))
        ->line('**Description:</strong>')
        ->line($request->maintenance_description)
        ->line('**Request Date:**' . $request->request_date->format('F j, Y'))
        ->action('View Request Details', url('/landlord/maintenance/requests'))
        ->line('Please review and schedule the maintenance at your earliest convenience.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
